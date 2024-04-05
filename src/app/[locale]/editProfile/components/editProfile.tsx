import React from 'react';
import styles from '@/app/[locale]/editProfile/components/editProfileComp.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { User, updateUser } from '@/app/services/updateUserService';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
import { CameraFill, Hr } from 'react-bootstrap-icons';
import { Mortarboard } from 'react-bootstrap-icons';
import { Briefcase } from 'react-bootstrap-icons';
import { Globe2 } from 'react-bootstrap-icons';
import { GlobeEuropeAfrica } from 'react-bootstrap-icons';
import { GenderFemale } from 'react-bootstrap-icons';
import { MusicNoteBeamed } from 'react-bootstrap-icons';
import { Heart } from 'react-bootstrap-icons';
import { Lightbulb } from 'react-bootstrap-icons';
import { Magic } from 'react-bootstrap-icons';
import { Book } from 'react-bootstrap-icons';
import { Clock } from 'react-bootstrap-icons';
import { } from 'react-bootstrap-icons';
import Modal from 'react-modal';
import { createProfile } from '@/app/services/createProfileService';
import { getProfile } from '@/app/services/GetProfileService';
class Profile {
  [key: string]: string | ((key: string, value: string) => void) | undefined;
  schoolYears?: string; // Где прошли мои школьные годы
  pets?: string; // Мои питомцы
  job?: string; // Моя работа
  myLocation?: string; // Где я живу
  myLanguages?: string; // Языки, на которых я говорю
  generation?: string; // Из какого я поколения
  favoriteSchoolSong?: string; // Любимая песня в школе
  passion?: string; // Что я безумно люблю
  interestingFact?: string; // Интересный факт обо мне
  uselessSkill?: string; // Мой самый бесполезный навык
  biographyTitle?: string; // Так можно было бы назвать мою биографию
  dailyActivity?: string; // Что я делаю часами
  aboutMe?: string; // Oбо мне
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async updateProfile(key: string, value: string) {
    // обновляем значение ключа в профиле
    this[key] = value;

    await createProfile(this, this.token);
  }
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: 'auto',
    borderRadius: '12px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
interface EditProfileProps {
  locale: string;
}
const EditProfile: React.FC<EditProfileProps> = ({ locale }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [maxLength, setMaxLength] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputLength, setInputLength] = useState(0);
  const [schoolYears, setSchoolYears] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [generation, setGeneration] = useState("");
  const [favoriteSong, setFavoriteSong] = useState("");
  const [passion, setPassion] = useState("");
  const [fact, setFact] = useState("");
  const [skill, setSkill] = useState("");
  const [biography, setBiography] = useState("");
  const [activity, setActivity] = useState("");
  const [about, setAbout] = useState("");
  const [pets, setPets] = useState("");
  const [switchState, setSwitchState] = useState("Off");
  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };

   useEffect(() => {
    const fetchUserDetails = async () => {
      if (loading === 'loading') {
        return;
      }


    }
    fetchUserDetails();
  }, [loading, session]);
  let token = session?.user?.name || "";
  let profile = new Profile(token);
  function updateProfile(modalTitle: string, inputValue: string) {
    profile.updateProfile(modalTitle, inputValue);
  }
  useEffect(() => {
    async function fetchProfile() {
      const profile = await getProfile(token);

      if (profile) {
        setSchoolYears(profile.schoolYears || "");
        setJob(profile.job || "");
        setLocation(profile.myLocation || "");
        setLanguages(profile.myLanguages || "");
        setGeneration(profile.generation || "");
        setFavoriteSong(profile.favoriteSchoolSong || "");
        setPassion(profile.passion || "");
        setFact(profile.interestingFact || "");
        setSkill(profile.uselessSkill || "");
        setBiography(profile.biographyTitle || "");
        setActivity(profile.dailyActivity || "");
        setAbout(profile.aboutMe || "");
        setPets(profile.pets || "");
      }
    }

    fetchProfile();
  }, []);
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    setInputLength(event.target.value.length);
    console.log('inputValue', inputValue);
  };
  const openModalWithContent = (title: string, message: string, inputLabel: string, maxLength: number, initialValue: string) => () => {
    setTitle(title);
    setMessage(message);
    setInputLabel(inputLabel);
    setMaxLength(maxLength);
    setInputValue(initialValue);
    setInputLength(initialValue.length);
    openModal();
  };
  function handleSwitchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSwitchState(event.target.checked ? "On" : "Off");
  }
  function handleSave(event: React.MouseEvent<HTMLButtonElement>) {
    const value = inputValue;
    const value2 = switchState;
    console.log("inputValue", inputValue);
    console.log('value', value);
    console.log('value2', value2);

    switch (title) {
      case 'Где вы учились?':
        setSchoolYears(value);
        console.log('schoolYears', value);
        profile.updateProfile('schoolYears', value);
        break;
      case 'Кем вы работаете?':
        setJob(value);
        profile.updateProfile('job', value);
        break;
      case 'Где вы живете?':
        setLocation(value);
        profile.updateProfile('myLocation', value);
        break;
      case 'Языки, на которых Вы говорите?':
        setLanguages(value);
        profile.updateProfile('myLanguages', value);
        break;
      case 'Время вашего рождения':
        setGeneration(value2);
        profile.updateProfile('generation', value2);
        break;
      case 'Любимая песня в школе':
        setFavoriteSong(value);
        profile.updateProfile('favoriteSchoolSong', value);
        break;
      case 'Что Вам особенно нравится?':
        setPassion(value);
        profile.updateProfile('passion', value);
        break;
      case 'Поделитесь интересным фактом о себе':
        setFact(value);
        profile.updateProfile('interestingFact', value);
        break;
      case 'Какой навык вам не пригодился?':
        setSkill(value);
        profile.updateProfile('uselessSkill', value);
        break;
      case 'Девиз — или биография?':
        setBiography(value);
        profile.updateProfile('biographyTitle', value);
        break;
      case 'Что вы готовы делать часами?':
        setActivity(value);
        profile.updateProfile('dailyActivity', value);
        break;
      case 'О вас':
        setAbout(value);
        profile.updateProfile('aboutMe', value);
        break;
      case "У вас есть домашние животные?":
        setPets(value);
        profile.updateProfile('pets', value);
        break;
      default:
        console.error(`Unknown title: ${title}`);
    }
    closeModal();
  }



  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [user, setUser] = useState<User>({
    Id: 0,
    Name: '',
    Password: '',
    Email: '',
    Address: '',
    PhoneNumber: '',
    DateOfBirth: new Date(),
    AirbnbRegistrationYear: new Date(),
    ProfilePicture: '',
    CurrentStatus: false,
    UserStatus: false,
    RefreshToken: '',
    Language: '',
    Country: '',
  });


  return (
    <div className={styles.container1}>
      <div className={styles.leftBlock1}>
        <div className={styles.circle1}>K</div>
        <button className={styles.button1}>
          <CameraFill />
          Добавить
        </button>
      </div>
      <div className={styles.rightBlock1}>
        <div className={styles.profileHeader}>
          <h1>Профиль</h1>
          <p>Всё, что вы расскажете, поможет другим гостям и хозяевам узнать вас получше.</p>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Где вы учились?",
          "Домашние уроки или средняя школа, колледж или профессиональное образование? Какое заведение помогло вам стать собой?",
          "Где прошли мои школьные годы:",
          40,
          schoolYears)}>
          <Mortarboard className={styles.icon} />
          <div className={styles.textContainer}>
            Школьные годы{schoolYears !== "" && ":"}
            {schoolYears !== "" && <p>{schoolYears}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Кем вы работаете?",
          "Какая у вас профессия? Если вы не работаете, расскажите о своем призвании. Пример: «медсестра», «родитель четверых детей» или «серфингист на пенсии».",
          "Моя работа:",
          40,
          job
        )}>
          <Briefcase className={styles.icon} />
          <div className={styles.textContainer}>
            Моя работа{job !== "" && ":"}
            {job !== "" && <p>{job}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Где вы живете?",
          "Напишите свой город",
          "Мой город:",
          40,
          location
        )}>
          <GlobeEuropeAfrica className={styles.icon} />
          <div className={styles.textContainer}>
            Где я живу{location !== "" && ":"}
            {location !== "" && <p>{location}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Языки, на которых Вы говорите?",
          "Перечислите языки, на которых Вы свободно говорит (через запятую)",
          "Языки:",
          40,
          languages
        )}>
          <Globe2 className={styles.icon} />
          <div className={styles.textContainer}>
            Языки, на которых я говорю{languages !== "" && ":"}
            {languages !== "" && <p>{languages}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Время вашего рождения",
          "Не волнуйтесь, точную дату никто не увидит.",
          "Из какого я поколения:",
          40,
          generation
        )}>
          <GenderFemale className={styles.icon} />
          <div className={styles.textContainer}>
            Из какого я поколения{generation !== "" && ":"}
            {generation !== "" && <p>{generation}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Любимая песня в школе",
          "Не смущайтесь! Расскажите, что вы слушали снова и снова, когда были подростком.",
          "Любимая песня в школе:",
          40,
          favoriteSong
        )}>
          <MusicNoteBeamed className={styles.icon} />
          <div className={styles.textContainer}>
            Любимая песня в школе{favoriteSong !== "" && ":"}
            {favoriteSong !== "" && <p>{favoriteSong}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Что Вам особенно нравится?",
          "Расскажите о том, что готовы делать бесконечно. Пример: «печь фокаччу с розмарином».",
          "Что я безумно люблю:",
          40,
          passion
        )}>
          <Heart className={styles.icon} />
          <div className={styles.textContainer}>
            Что я безумно люблю{passion !== "" && ":"}
            {passion !== "" && <p>{passion}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Поделитесь интересным фактом о себе",
          "Вспомните уникальный или примечательный факт о себе. Пример: «меня сняли в видеоклипе» или «я умею жонглировать».",
          "Интересный факт обо мне:",
          40,
          fact
        )}>
          <Lightbulb className={styles.icon} />
          <div className={styles.textContainer}>
            Интересный факт обо мне{fact !== "" && ":"}
            {fact !== "" && <p>{fact}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Какой навык вам не пригодился?",
          "Расскажите о своих удивительных, но совершенно бесполезных способностях. Пример: «я умею тасовать колоду карт одной рукой».",
          "Мой самый бесполезный навык:",
          40,
          skill
        )}>
          <Magic className={styles.icon} />
          <div className={styles.textContainer}>
            Мой самый бесполезный навык{skill !== "" && ":"}
            {skill !== "" && <p>{skill}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Девиз — или биография?",
          "Представьте, что кто-то пишет книгу о вас. Как ее можно было бы назвать? Пример: «Рожденный для странствий» или «Записки собачницы».",
          "История моей жизни:",
          40,
          biography
        )}>
          <Book className={styles.icon} />
          <div className={styles.textContainer}>
            История моей жизни{biography !== "" && ":"}
            {biography !== "" && <p>{biography}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "Что вы готовы делать часами?",
          "Расскажите о любимых занятиях, на которые тратите свободное время. Пример: «смотрю видео с котиками» или «играю в шахматы».",
          "Что я делаю часами:",
          40,
          activity
        )}>
          <Clock className={styles.icon} />
          <div className={styles.textContainer}>
            Что я делаю часами{activity !== "" && ":"}
            {activity !== "" && <p>{activity}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
          "У вас есть домашние животные?",
          "Если да, расскажите, какие именно и как их зовут. Пример: «трехцветная кошка Уискерс» или «проворная черепаха Леонардо».",
          "Мои питомцы:",
          40,
          pets
        )}>
          <img src="/icon/paw.png" alt="paws" />
          <div className={styles.textContainer}>
            Питомцы{pets !== "" && ":"}
            {pets !== "" && <p>{pets}</p>}
          </div>
        </div>

        <div className={styles.aboutSection}>
          <h1>О вас</h1>
          <div className={styles.dashedBorder}>
            <p>Напишите что-нибудь интересное и запоминающееся.</p>
            <a href="#" style={{ color: 'black', fontWeight: 'bold' }} onClick={openModalWithContent(
              "О вас",
              "Гости и хозяева хотят знать, с кем имеют дело. Помогите им, расскажите о себе.",
              "О вас:",
              450,
              about
            )}>
              Добавить рассказ о себе
            </a>
            {about !== "" && <p>{about}</p>}
          </div>
        </div>
        <div className={styles.readyBut}>
          <button className={styles.readyButton} onClick={() => alert('Ready')}>Готов</button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          backgroundColor: 'white',
          border: 'none',
          fontWeight: 'bold',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'lightgray'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >X</button>
        <h2 style={{ marginRight: '15px' }}>{title}</h2>
        <p style={{ color: '#707070' }}>{message}</p>
        {title === "Время вашего рождения" ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div>Показывать десятилетие моего рождения</div>
              <div style={{ fontSize: '14px', color: 'gray' }}>90-х годов рождения</div>
            </div>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={handleSwitchChange}
              style={{
                fontSize: '1.4rem',
                color: 'red',
                transform: 'scale(1.2)',
                display: 'flex',
                flexDirection: 'column',
                marginRight: '20px',
              }}
            />
          </div>
        ) : title === "О вас" ? (
          <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder={inputLabel}
                maxLength={maxLength}
                autoComplete="off"
                onChange={handleInputChange}
                style={{ maxHeight: '600px' }}
              />
            </Form.Group>
            <div className="text-end mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: 'gray', marginTop: '3px' }}>
              Символы: {inputLength} из {maxLength}
            </div>
          </div>
        ) : (
          <div>
            <Form.Floating>
              <Form.Control
                id="floatingInput"
                type="text"
                placeholder={inputLabel}
                maxLength={maxLength}
                autoComplete="off"
                value={inputValue}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInput">{inputLabel}</label>
            </Form.Floating>
            <div className="text-end mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: 'gray', marginTop: '3px' }}>
              Символы: {inputLength} из {maxLength}
            </div>
          </div>
        )}
        <hr />
        <div className="text-end">
          <Button variant="dark" onClick={handleSave}>Сохранить</Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;

