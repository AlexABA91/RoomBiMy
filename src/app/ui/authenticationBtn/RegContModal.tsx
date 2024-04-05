import React, { useRef, useState, useEffect } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AuthenticationBtn.module.css";
import { ChevronLeft } from "react-bootstrap-icons";
import { Calendar } from "react-bootstrap-icons";
import MaskedInput from "react-text-mask";
import { isValid, parse } from "date-fns";
import { useTranslation } from "next-i18next";
import { signIn, signOut } from "next-auth/react";
import { uk } from "date-fns/locale";
import { enUS } from "date-fns/locale";
import { getCountries } from "@/app/services/getCountriesService";
import "@/app/[locale]/globals.css";
interface Country {
  name: string;
  phoneCode: string;
}
interface RegContModalProps {
  show: boolean;
  onHide: () => void;
  openModalForm: () => void;
  email: string;
  password: string;
}
interface RequestUser {
  email?: string;
  password?: string;
  type?: string;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  country?: string;
}
const RegContModal: React.FC<RegContModalProps> = ({
  show,
  onHide,
  openModalForm,
  email,
  password,
}) => {
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+380");
  const [phone, setPhone] = useState(countryCode);
  const [countryName, setCountryName] = useState("");
  const [error1, setError1] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [errors, setErrors] = useState<{
    names?: string | null;
    phone?: string | null;
    country?: string | null;
  }>({});

  const currentLanguage = i18n.language;
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await getCountries();
      setCountries(countriesData);
    };

    fetchCountries();
  }, []);
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setCountryCode("");
    setErrors({});
    setError1("");
    setPhone("");
    setDate(null);
    setError("");
  };
  const handleClose = () => {
    onHide();
    resetForm();
  };
  const validateNames = () => {
    if (!firstName || !lastName) return t("namesRequired");
    return null;
  };

  const validateForm = () => {
    const namesError = validateNames();
    const phoneError =
      !phone || phone === countryCode ? t("phoneRequired") : null;
    const countryError =
      !countryCode || !countryName ? t("countryRequired") : null;

    setErrors({
      names: namesError,
      phone: phoneError,
      country: countryError,
    });

    return !(namesError || phoneError || countryError);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // if (!countryCode || !countryName) {
    //   setError1('Пожалуйста, выберите страну');
    //   return;
    // }
    const validateDate = (date: Date | null) => {
      if (date === null || date === undefined) {
        setError(t("incorrectDate"));
        return false;
      }

      if (!date || isNaN(date.getTime())) {
        setError(t("incorrectDate"));
        return false;
      }

      if (date > new Date()) {
        setError(t("futureBirthDate"));
        return false;
      }
      if (!validateForm()) {
        return;
      }
      const today = new Date();
      const birthDate = new Date(date);
      const birthYear = birthDate.getFullYear();

      let age = today.getFullYear() - birthYear;
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        setError(t("minAgeError"));
        return false;
      } else {
        setError(null);
      }
      return true;
    };
    console.log(date);
    if (!validateDate(date)) {
      return;
    }

    const user: RequestUser = {
      email: email,
      password: password,
      type: "register2",
      name: `${firstName} ${lastName}`,
      phoneNumber: phone,
      dateOfBirth: date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(date.getDate()).padStart(2, "0")}`
        : undefined,
      country: countryName,
    };

    try {
      console.log(user);
      const res = await signIn("credentials", {
        ...user,
        redirect: false,
      });
    } catch (error) {}
  };
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleDateChange = (date: Date | null) => {
    if (date === null || date === undefined) {
      return;
    }

    if (!date || isNaN(date.getTime())) {
      setError(t("incorrectDate"));
      return;
    }

    if (date > new Date()) {
      setError(t("futureBirthDate"));
      return;
    }

    const today = new Date();
    const birthDate = new Date(date);
    const birthYear = birthDate.getFullYear();

    let age = today.getFullYear() - birthYear;
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setError(t("minAgeError"));
    } else {
      setError(null);
    }
    setDate(date);
    setOpen(false);
  };

  const handleRawChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDate(null);
    if (typeof value !== "string") {
      handleDateChange(value);
      return;
    }

    const date = parse(value, "dd.MM.yyyy", new Date());

    if (!isValid(date)) {
      setError(t("incorrectDate"));
      return;
    }

    handleDateChange(date);
  };
  return (
    <Modal show={show} onHide={handleClose} centered animation>
      <Modal.Header closeButton>
        <Button
          variant="light"
          onClick={() => {
            onHide();
            openModalForm();
            resetForm();
          }}
          style={{
            marginRight: "auto",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            borderColor: "transparent",
            padding: "10px",
          }}
        >
          <ChevronLeft />
        </Button>
        <Modal.Title className={styles.modalTitle}>
          {t("completeRegistration")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingFirstName"
              type="text"
              placeholder={t("firstName")}
              value={firstName}
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
            />
            <label htmlFor="floatingFirstName">{t("firstName")}</label>
          </Form.Floating>

          <Form.Floating>
            <Form.Control
              id="floatingLastName"
              type="text"
              placeholder={t("lastName")}
              value={lastName}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
              }}
            />
            <label htmlFor="floatingLastName">{t("lastName")}</label>
          </Form.Floating>
          {errors.names && <div className="text-danger">{errors.names}</div>}
          <Form.Text className="text-muted small">
            {t("identityData")}
          </Form.Text>
          <div className="form-floating">
            <Form.Select
              id="floatingSelect"
              className="my-2"
              aria-label="Default select example"
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                setCountryName(
                  e.target.options[e.target.selectedIndex].dataset.name || ""
                );
                setPhone(e.target.value);
                setError1("");
              }}
            >
              <option selected disabled value="">
                {t("selectCountry")}
              </option>

              {countries &&
                countries.map((country) => (
                  <option
                    key={country.phoneCode}
                    value={country.phoneCode}
                    data-name={country.name}
                  >
                    {country.name} ({country.phoneCode})
                  </option>
                ))}
            </Form.Select>

            <label htmlFor="floatingSelect">{t("selectCountryCode")}</label>
            {errors.country && (
              <div className="text-danger">{errors.country}</div>
            )}
          </div>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingPhone"
              type="text"
              placeholder={countryCode}
              value={phone}
              autoComplete="off"
              maxLength={14}
              onChange={(e) => {
                const value = e.target.value;
                if (value.startsWith(countryCode)) {
                  const numericValue = value
                    .slice(countryCode.length)
                    .replace(/\D/g, "");
                  setPhone(countryCode + numericValue);
                } else {
                  setPhone(countryCode);
                }
              }}
            />
            <label htmlFor="floatingPhone">{t("phone")}</label>
          </Form.Floating>
          {errors.phone && <div className="text-danger">{errors.phone}</div>}

          <div className="form-floating w-100">
            <div style={{ position: "relative" }} ref={wrapperRef}>
              <DatePicker
                locale={currentLanguage === "ua" ? uk : enUS}
                id="floatingDate"
                selected={date}
                onChange={handleDateChange}
                onChangeRaw={handleRawChange}
                dateFormat="dd.MM.yyyy"
                autoComplete="off"
                className={`form-control ${
                  error ? "text-danger border-danger" : ""
                }`}
                wrapperClassName="w-100"
                yearDropdownItemNumber={5}
                showYearDropdown
                customInput={
                  <MaskedInput
                    mask={[
                      /\d/,
                      /\d/,
                      ".",
                      /\d/,
                      /\d/,
                      ".",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                    className={error ? "input-error" : ""}
                    style={{
                      height: "50px",
                      paddingTop: "20px",
                      flex: 1,
                      color: error ? "red" : "inherit",
                      boxShadow: error
                        ? "0 0 0 0.2rem rgba(255, 0, 0, 0.25)"
                        : "",
                    }}
                    onClick={() => setOpen(false)}
                    readOnly
                    placeholder="dd.MM.yyyy"
                  />
                }
                open={open}
              />
              <Calendar
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setOpen((prevOpen) => !prevOpen)}
              />
              {error && <div className="text-danger">{error}</div>}
            </div>

            <label
              htmlFor="floatingDate"
              style={{
                top: "-15px",
                color: error ? "red" : "gray",
                fontSize: "0.9rem",
              }}
            >
              {t("birthDate")}
            </label>
            <Form.Text className="text-muted" style={{ marginTop: "20px" }}>
              {t("minAge")}
            </Form.Text>
          </div>

          <Button
            variant="danger"
            type="submit"
            className={`d-grid gap-2 ${styles.submitButton}`}
            onClick={handleClick}
          >
            {t("agreeAndContinue")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegContModal;
