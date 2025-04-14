import React from "react";
import "./Profiles.css";
import kz from "../../../assets/kundz.png";
const profiles = [
  {
    href: "https://www.linkedin.com/in/%D0%BA%D1%83%D0%BD%D0%B4%D1%8B%D0%B7-%D0%BC%D0%B0%D0%BA%D1%81%D1%83%D1%82%D0%BE%D0%B2%D0%B0-628746152",
    name: "Максутова Кундыз Мухтаровна",

    experience:
      "Диссертациның тақырыбы: «Технологии обработки знаний в области информатики на казахском языке»",
    src: kz,
  },
];
const Profiles = () => {
  return (
    <div className="profile-container">
      {profiles.map((profile, index) => (
        <a href={profile.href} className="aa">
          <div key={index} className="profile-card">
            <div className="profile-image">
              <img src={profile.src} alt={profile.name} />
            </div>
            <div className="profile-info">
              <div className="overlay-img">
                <h2>{profile.name}</h2>
                <h3>{profile.title}</h3>
              </div>
              <p>
                {profile.experience}
                <br />
                Ақпараттық коммуникациялық технологиялар
                <br />
                <br />
                Нұр-Сұлтан қ.
                <br />
                тел. +7 702 511 85 90
                <br />
                Е-mail: kundyzym@bk.ru
                <br />
                <br />
                <b>Список опубликованных статей:</b>
                <ul>
                  <ol>
                    <b>I. Scopus</b> <br /> Kundyz Maksutova, Rozamgul Niyazova,
                    Amangul Talgat, Aizhan Anetova, Manas Yergesh. Synthesis of
                    Concepts and Applications of Information Intelligent Systems
                    and Knowledge Bases in Computer Science: A Systematic
                    Literature Review. Ingénierie des Systèmes d’Information
                    (Процентиль 44%) Vol. 29, No. 2, April, 2024, pp.591-598.
                    https://doi.org/10.18280/isi.290220
                  </ol>
                  <br />
                  <ol>
                    <b>II. Кксон журналы</b> <br /> 2. K. Maksutova, N.
                    Saparkhojayev, Dusmat Zhamangarin. Development of an
                    ontological model of deep learning neural networks.
                  </ol>
                  <ol>
                    3. K. Maxutova, N. Saparkhojayev , D. Zhamangarin, V.
                    Golenkov , R. Niyazova Knowledge processing technologies in
                    the area of computer science «ВЕСТНИК ВКТУ» № 3, 2024.
                  </ol>
                  <ol>
                    4. Maksutova, K., Tleubayeva, A., Niyazova, R., &
                    Shaikhanova, A. (2023). Protégé ontology in computer
                    science. Журнал Вестник НИА РК, No 4.
                  </ol>
                  <ol>
                    5. K. Maxutova, R. Niyazova. Ontological Approach to the
                    Formation of Subject-Oriented Knowledge Bases in Computer
                    Science. Журнал Вестник - Труды университета (Ожидается
                    публикации)
                  </ol>
                  <br />
                  <ol>
                    <b>III. Международной научно-практической конференции</b>{" "}
                    <br /> 6. Максутова К.М., Талғат А., Тохаева А.О., Ергеш
                    М.Ж. (Астана, Казахстан) Информатика және Онтология, Cборник
                    материалов международного научно-методического журнала
                    «Global science and innovations 2022: Central asia» научно-
                    практический журнал, № 4(18). ДЕКАБРЬ 2022, СЕРИЯ
                    «ТЕХНИЧЕСКИЕ НАУКИ»
                  </ol>
                  <ol>
                    7. Өндірістегі ақпараттық қауіпсіздіктің ерекшеліктері
                    «ИННОВАЦИЯЛАР ЖӘНЕ ҚАЗІРГІ ЗАМАНҒЫ ҒЫЛЫМДЫ ДАМЫТУ
                    МӘСЕЛЕЛЕРІ» Халықаралық ғылыми-тәжірибелік конференциясы{" "}
                  </ol>
                  <ol>
                    8. Государственная программа «Цифровой Казахстан -2020»
                    Общество. №2(13) 2019 ІSSN 2310-9319 г.Чебоксары
                  </ol>
                </ul>
                <ul>
                  <li>
                    <a
                      href="/Свидетельство.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 Авторлық құқық куәлігі – Informatics_Kaz (13.03.2025)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Свидетельство-2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 Авторлық құқық куәлігі – QazaqAI жүйесі (04.04.2025)
                    </a>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Profiles;
