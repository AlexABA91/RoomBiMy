"use client";
import {
  InputGroup,
  FormControl,
  Modal,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./AuthenticationBtn.module.css";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "next-i18next";
import RegContModal from "./RegContModal";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useSession } from "next-auth/react";
interface RequestUser {
  email?: string;
  password?: string;
  type?: string;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  country?: string;
}

interface SignInResponse {
  status: number;
  error?: string | null;
}

interface ModalFormProps {
  show: boolean;
  isRegistration: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  show,
  isRegistration,
  handleClose,
  handleOpen,
}) => {
  const session = useSession();

  const { t } = useTranslation();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  undefined;
  const [showNewModal, setShowNewModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isRepeatPasswordFocused, setIsRepeatPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const handleModalClose = () => {
    cleaning();
    setIsEmailValid(true);
    setIsPasswordValid(true);
    setIsRepeatPasswordValid(true);
    setServerError("");
    handleClose();
  };

  const openModalForm = () => {
    handleOpen();
  };
  const handleSignIn = async () => {
    try {
      const res = await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Помилка входу через Google:", error);
    }
  };

  const validatePassword = (password: string) => {
    return password.length >= 5;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
    setIsRepeatPasswordValid(newPassword === repeatPassword);
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
    setIsRepeatPasswordValid(event.target.value === password);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailValid(validateEmail(event.target.value));
  };

  const touch = () => {
    if (!isRegistration) {
      if (password == "") {
        setIsPasswordValid(false);
        return false;
      }
      if (email == "") {
        setIsEmailValid(false);
        return false;
      }
    } else if (isRegistration) {
      if (password == "") {
        setIsPasswordValid(false);
        return false;
      }
      if (email == "") {
        setIsEmailValid(false);
        return false;
      }
      if (repeatPassword == "" || repeatPassword != password) {
        setIsRepeatPasswordValid(false);
        return false;
      }
    }
    return true;
  };

  const cleaning = () => {
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  const signinType = async (type: string) => {
    let user: RequestUser = {
      email: email,
      password: password,
      type: type,
    };

    console.log(user);

    try {
      const res: string | SignInResponse | undefined = await signIn(
        "credentials",
        {
          email: user.email,
          password: user.password,
          type: user.type,
          redirect: false,
        }
      );
      console.log(res?.status, res?.error);

      console.log("SDT- 0", session.data?.user?.name);
      setTimeout(() => {
        console.log("SDT- 1", session.data?.user?.name);
      }, 1500);
      //   const res = await getAllChat(session.data?.user?.name);
      //   if (res) {
      // 	dispatch(setMessageObjList(res));
      //   }

      if (res?.error === "Ok") {
        console.log("Response is a string: ", res.error);
        console.log("OK - ", res);
        handleClose();
        setShowNewModal(true);
        setServerError("");
      } else {
        if (res?.error == "CredentialsSignin") {
          setServerError(t("serverError"));
        } else {
          setServerError(res?.error || null);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      setServerError((error as Error).message);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!touch()) return null;
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }
    if (!isRegistration) {
      await signinType("login");
    } else if (isRegistration) {
      await signinType("register");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleModalClose} centered animation>
        <Modal.Header closeButton>
          <Modal.Title className={styles.modalTitle}>
            {t("enterOrRegister")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <h2 className={styles.welcomeMessage}>{t("welcomeMessage")}</h2>
            {serverError && (
              <p style={{ color: "red" }} className={styles.itemFont}>
                {serverError}
              </p>
            )}
            <Form>
              <div
                className={`form-floating my-3 ${
                  email || isEmailFocused ? "is-focused" : ""
                }`}
              >
                <Form.Control
                  className={`${styles.formControl} ${
                    !isEmailValid ? "input-invalid" : ""
                  }`}
                  type="email"
                  id="formBasicEmail"
                  placeholder={t("email")}
                  value={email}
                  autoComplete="off"
                  onChange={handleEmailChange}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  style={{
                    borderColor: isEmailValid ? "" : "red",
                    boxShadow: isEmailValid
                      ? ""
                      : "0 0 0 0.2rem rgba(255, 0, 0, 0.25)",
                  }}
                />
                <label
                  htmlFor="formBasicEmail"
                  style={{ color: isEmailValid ? "" : "red" }}
                  className={styles.itemFont}
                >
                  {t("email")}
                </label>
                {!isEmailValid && (
                  <div className="invalid-feedback d-block itemFont">
                    {t("enterValidEmail")}
                  </div>
                )}
              </div>
              <div
                className={`form-floating my-3 ${
                  password || isPasswordFocused ? "is-focused" : ""
                }`}
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="formBasicPassword"
                  placeholder={t("password")}
                  value={password}
                  autoComplete="off"
                  onChange={handlePasswordChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  style={{
                    borderColor: isPasswordValid ? "" : "red",
                    boxShadow: isPasswordValid
                      ? ""
                      : "0 0 0 0.2rem rgba(255, 0, 0, 0.25)",
                    paddingRight: "40px",
                  }}
                />
                <label
                  htmlFor="formBasicPassword"
                  style={{ color: isPasswordValid ? "" : "red" }}
                  className={styles.itemFont}
                >
                  {t("password")}
                </label>
                {!isPasswordValid && (
                  <div className="invalid-feedback d-block itemFont">
                    {t("passwordMustBeAtLeast5")}
                  </div>
                )}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: isPasswordValid ? "50%" : "35%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </span>
              </div>
              {isRegistration && (
                <div
                  className={`form-floating my-3 ${
                    repeatPassword || isRepeatPasswordFocused
                      ? "is-focused"
                      : ""
                  }`}
                >
                  <Form.Control
                    type={showRepeatPassword ? "text" : "password"}
                    id="formBasicRepeatPassword"
                    placeholder={t("confirmPassword")}
                    value={repeatPassword}
                    autoComplete="off"
                    onChange={handleRepeatPasswordChange}
                    onFocus={() => setIsRepeatPasswordFocused(true)}
                    onBlur={() => setIsRepeatPasswordFocused(false)}
                    style={{
                      borderColor: isRepeatPasswordValid ? "" : "red",
                      boxShadow: isRepeatPasswordValid
                        ? ""
                        : "0 0 0 0.2rem rgba(255, 0, 0, 0.25)",
                      paddingRight: "40px",
                    }}
                  />
                  <label
                    htmlFor="formBasicRepeatPassword"
                    style={{ color: isRepeatPasswordValid ? "" : "red" }}
                    className={styles.itemFont}
                  >
                    {t("confirmPassword")}
                  </label>
                  {!isRepeatPasswordValid && (
                    <div className="invalid-feedback d-block itemFont">
                      {t("passwordsDoNotMatch")}
                    </div>
                  )}
                  <span
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: isRepeatPasswordValid ? "50%" : "35%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showRepeatPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </div>
              )}
              <Button
                className={`d-grid gap-2 ${styles.submitButton} ${styles.itemFont}`}
                variant="danger"
                type="button"
                onClick={handleSubmit}
              >
                {t("continue")}
              </Button>
            </Form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <hr style={{ flex: 1 }} />
              <p style={{ margin: "0 10px" }} className={styles.itemFont}>
                {t("or")}
              </p>
              <hr style={{ flex: 1 }} />
            </div>
            <Button
              variant="outline-dark"
              className={`google-button ${styles.googleButton} ${styles.itemFont}`}
              onClick={handleSignIn}
            >
              <Image
                priority
                src="/icon/google.svg"
                width={18}
                height={18}
                alt="google icon"
              />
              {t("continueWithGoogle")}
            </Button>
            {/* <button onClick={() => signOut()}>signOut</button> */}
          </>
        </Modal.Body>
      </Modal>
      <RegContModal
        show={showNewModal}
        onHide={() => setShowNewModal(false)}
        openModalForm={openModalForm}
        email={email}
        password={password}
      />
    </>
  );
};

export default ModalForm;
