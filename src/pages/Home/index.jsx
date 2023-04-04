import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Pokemons from "./Pokemons";
import styles from "./style.module.scss";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]); // передаємо список усіх покемонів
  const [selectedPokemon, setSelectedPokemon] = useState(null); // передаємо вивід інформації про покемона, на якого навели курсор
  const [loading, setLoading] = useState(true); // завантаження
  const [currentPage, setCurrentPage] = useState(1); // передаємо яка сторінка обрана на даний момент (можна зробити запам'ятовування останньої обраної сторінки)
  const [pokemonsPerPage] = useState(10); // к-ть покемонів на одній сторінці

  useEffect(() => { // приймаємо покемонів з api за допомогою axios запитом
    const fetchPokemonData = async () => {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100"); // загальна к-ть покемонів
      const results = response.data.results;

      const pokemonPromises = results.map(async (result) => { // приймаємо більш детальну інфу про покемонів, map приймає об'єкт і ділить його на окремі елементи (як масив)
        const pokemonResponse = await axios.get(result.url);
        return pokemonResponse.data;
      });

      const pokemonList = await Promise.all(pokemonPromises); // запис даних з api у змінну (promise чекає, поки всі покемони завантажаться)
      setPokemonList(pokemonList);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const handlePokemonSelect = (pokemon) => { // вивід інформації про покемона, на якого навели курсор
    setSelectedPokemon(pokemon);
  };

  const lastPokemonIndex = currentPage * pokemonsPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
  const currentPokemon = pokemonList.slice(firstPokemonIndex, lastPokemonIndex); // ділить 100 покемонів, щоб на кожній сторінці було по 10 покемонів

  const paginate = pageNumber => setCurrentPage(pageNumber); // яка сторінка обрана на даний момент (можна зробити запам'ятовування останньої обраної сторінки)
  const prevPage = () => setCurrentPage(prev => prev - 1); // назад
  const nextPage = () => setCurrentPage(prev => prev + 1); // вперед

  if (loading) { // завантаження
    return <div className={styles.loading}>
      <div>Loading</div>
    </div>
  }
  
  return ( // вивід всієї сторінки
    <div className={styles.PokemonList}>
      <div className={styles.header}>
        <h2 className={styles.text_pokemons}>POKEMONS</h2>
      </div>
      <Pokemons className={styles.Pokemon} // передача інформації з цього файлу у папку pokemons
        currentPokemon={currentPokemon}
        loading={loading}
        handlePokemonSelect={handlePokemonSelect}
        setSelectedPokemon={setSelectedPokemon}
        selectedPokemon={selectedPokemon}
      />
      <Pagination // передача інформації з цього файлу у папку pagination
        pokemonsPerPage={pokemonsPerPage}
        totalPokemons={pokemonList.length}
        currentPage={currentPage}
        loading={loading}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default Home;