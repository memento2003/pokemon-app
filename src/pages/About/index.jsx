import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import uniqid from 'uniqid';
import styles from './style.module.scss';

const About = () => {
  const { id } = useParams(); // переданий id з Pokemons через to, сторінка About приймає id покемона з Link
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true); // loading зроблений, щоб коли покемони завантажувались, сторінка не була "зламаною"
  const [selectTab, setSelectTab] = useState(1); // яка вкладка буде відкрита спочатку (pokedex, stats, evolution)

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); // дізнаємося інфу конкретного покемона і записуємо про нього інфу у UseState
      setPokemon(response.data);

      setLoading(false); // коли завантажена сторінка, loading - false і зникає напис
    };
    
    fetchPokemonData();
  }, [id]);

  if (loading) { // поки завантаження працює в нас з'являється напис Loading
    return <div className={styles.loading}>
      <div>Loading</div>
    </div>
  }
  
  return (
    <div className={styles.About}> {/* головний div*/}
      <div className={styles.container_head}> {/* div, що відповідає за створення шапки (back, name, id) */}
        <Link className={`${styles.btn} ${styles.btn_back}`} to='/'>Back</Link> {/* повертає на головну сторінку (/ - головна сторінка) */}
        <div className={styles.name_head}>{pokemon.name}</div>
        <div className={styles.container_id}>
          <div className={styles.id_pokemon}>#{pokemon.id}</div>
        </div>
      </div>

      <div className={styles.container_main}> {/* виводить інформацію, що знаходиться під шапкою */}
        <div className={styles.img_pokemon}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} // виводимо картинку
            alt={pokemon.name}
          />
        </div>
        <div className={styles.container_info}> {/* вся інфа знизу шапки, окрім картинки */}
          <div className={styles.tabs}> {/* який таб обраний */}
            <div className={`${styles.tab} ${selectTab === 1 ? styles.selectTab : ""}`} onClick={() => setSelectTab(1)}>Pokedex</div>
            <div className={`${styles.tab} ${selectTab === 2 ? styles.selectTab : ""}`} onClick={() => setSelectTab(2)}>Stats</div>
            <div className={`${styles.tab} ${selectTab === 3 ? styles.selectTab : ""}`} onClick={() => setSelectTab(3)}>Evolution</div>
          </div>
          <div className={styles.info}> {/* все, що знаходиться в блоку під табами */}
            <div className={`${styles.content} ${selectTab === 1 ? styles.active_content : ""}`}> {/* все, що знаходиться в pokedex */}
              <div className={styles.info_item}> {/* Types */}
                <div className={styles.info_title}>
                  Types
                </div>
                <div className={styles.info_datas}>
                  {pokemon.types?.map((type) => ( // мапаємо, щоб types були роздільні, ? - для перевірки, чи існує даний параметр
                    <div key={uniqid('type-')} className={styles.info_data}> {/* через те, що ми мапаємо, треба створити унікальні ключі через uniqid */}
                        {type.type.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.info_item}> {/* Height */}
                <div className={styles.info_title}>Height</div>
                <div className={styles.info_datas}>{pokemon.height / 10} m</div>
              </div>
              <div className={styles.info_item}> {/* Weight */}
                <div className={styles.info_title}>Weight</div>
                <div className={styles.info_datas}>{pokemon.weight / 10} kg</div>
              </div>
              <div className={styles.info_item}> {/* Abilities */}
                <div className={styles.info_title}>
                  Abilities
                </div>
                <div className={styles.info_datas}>
                  {pokemon.abilities?.map((ability) => ( // мапаємо, щоб ability були роздільні
                    <div key={uniqid('ability-')} className={styles.info_data}> {/* через те, що ми мапаємо, треба створити унікальні ключі через uniqid */}
                        {ability.ability.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`${styles.content} ${selectTab === 2 ? styles.active_content : ""}`}> {/* все, що знаходиться в stats */}
              {pokemon.stats?.map((stat) => ( // мапаємо, щоб stat були роздільні
                <div key={uniqid('stat-')} className={styles.info_item}> {/* через те, що ми мапаємо, треба створити унікальні ключі через uniqid */}
                  <div className={styles.info_title}>{stat.stat.name}</div>
                  <div className={styles.info_datas}>
                    <div className={styles.info_data}>{stat.base_stat}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`${styles.content} ${selectTab === 3 ? styles.active_content : ""}`}> {/* все, що знаходиться в evolution */}
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;