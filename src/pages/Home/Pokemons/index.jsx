import React from 'react';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import styles from "./style.module.scss";

const Pokemons = ({currentPokemon, handlePokemonSelect, setSelectedPokemon, selectedPokemon}) => { // всі прийняті пропси з Home
  return (
    <div className={styles.pokemon_list}>
      <div className={styles.pokemon_list_items}> {/* ділимо покемонів з 10 на кожен окремий і структуруємо інфу згідно шаблону (Link)*/}
        {currentPokemon.map((pokemon, index) => ( // currentpokemon - масив, мапаємо, щоб поділити на окремого покемона і додаємо індекс
          <Link // шаблон з інфою для кожного покемона, кожен покемон не div, а саме Link
            key={pokemon.name} // використовуємо при мепінгу, тому що повинен бути унікальний кей (важливо, щоб не повторювався)
            to={`/About/pokemon/${pokemon.id}`} // перехід в About по id покемона
            className={styles.pokemon_item}
            onMouseEnter={() => handlePokemonSelect({ ...pokemon, index})} // поки курсор на покемоні, то воно виводить інфу про покемона
            onMouseLeave={() => setSelectedPokemon(null)} // коли курсора немає, то зникає інфа
          >
            <div className={styles.text_list_items}> {/* робимо заглавні букви */}
                {pokemon.name.toUpperCase()}
            </div>
            <div className={styles.img_list_items}> 
              <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} // додаємо в блок з покемоном (Link) маленьку картинку
                  alt={pokemon.name}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.pokemon_box_info}>
        {selectedPokemon && ( // перевіряє якщо в нас існує обраний покемон під курсором, то виконується наступний код (створюється div і в ньому виводиться вся інформація у віконці)
          <div className={styles.pokemon_info}>
            <div className={styles.idAndNameAndImg}>
              <div className={styles.idAndName}>
                <div className={styles.id}>#{selectedPokemon.id}</div>
                <div className={styles.name}>{selectedPokemon.name.toUpperCase()}</div>
              </div>
              <div className={styles.pokemon_image_container}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${selectedPokemon.id}.svg`}
                  alt={selectedPokemon.name}
                />
              </div>
            </div>
            <div className={styles.pokemon_info_item}>
              <div className={styles.item_title}>
                Type
              </div>
              <div className={styles.item_datas}>
                {selectedPokemon.types?.map((type) => ( // створює унікальні ключі (key) завдяки uniqid (шаблон: type-радномні символи)
                  <div key={uniqid('type-')} className={styles.item_data}>
                    {type.type.name}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.pokemon_info_item}>
              <div className={styles.item_title}>
                Height
              </div>
              <div className={styles.item_data}>
                {selectedPokemon.height / 10} m
              </div>
            </div>
            <div className={styles.pokemon_info_item}>
              <div className={styles.item_title}>
                Weight
              </div>
              <div className={styles.item_data}>
                {selectedPokemon.weight / 10} kg
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemons;