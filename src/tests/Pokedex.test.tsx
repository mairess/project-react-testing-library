import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const id = 'pokemon-name';
const btnRegex = /próximo pokémon/i;

describe('Teste o componente <Pokedex.tsx />.', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);
    const regEx = /encountered pokémon/i;
    const heading = screen.getByRole('heading', { name: regEx, level: 2 });
    expect(heading).toHaveTextContent(regEx);
  });
  test('O botão deve conter o texto Próximo Pokémon.', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByText(btnRegex);
    expect(nextPokemonBtn).toHaveTextContent(btnRegex);
  });
  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
    const { user } = renderWithRouter(<App />);
    const firstPokemon = screen.getByTestId(id);
    expect(firstPokemon).toHaveTextContent(/pikachu/i);
    const nextPokemonBtn = screen.getByText(btnRegex);
    await user.click(nextPokemonBtn);
    const secondPokemon = screen.getByTestId(id);
    expect(secondPokemon).toHaveTextContent(/charmander/i);
  });
  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista.', async () => {
    const { user } = renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByText(btnRegex);
    await user.tripleClick(nextPokemonBtn);
    await user.tripleClick(nextPokemonBtn);
    await user.tripleClick(nextPokemonBtn);
    const pokemon = screen.getByTestId(id);
    expect(pokemon).toHaveTextContent(/pikachu/i);
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', async () => {
    const { user } = renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByText(btnRegex);
    await user.click(nextPokemonBtn);
    const moreThanOnePokemon = screen.getAllByTestId(id);
    expect(moreThanOnePokemon.length).toBe(1);
  });
  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', async () => {
    renderWithRouter(<App />);
    const allBtn = screen.getAllByTestId('pokemon-type-button');
    expect(allBtn.length).toBe(7);
    expect(allBtn[0]).toHaveTextContent(/electric/i);
    expect(allBtn[1]).toHaveTextContent(/fire/i);
    expect(allBtn[2]).toHaveTextContent(/bug/i);
    expect(allBtn[3]).toHaveTextContent(/poison/i);
    expect(allBtn[4]).toHaveTextContent(/psychic/i);
    expect(allBtn[5]).toHaveTextContent(/normal/i);
    expect(allBtn[6]).toHaveTextContent(/dragon/i);
  });
  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo.', async () => {
    const { user } = renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByText(btnRegex);
    const psychic = screen.getByRole('button', { name: /psychic/i });
    expect(psychic).toHaveTextContent(/psychic/i);
    const firstPsychicPokemon = screen.getByTestId(id);
    await user.click(psychic);
    expect(firstPsychicPokemon).toHaveTextContent(/alakazam/i);
    await user.click(nextPokemonBtn);
    const secondPsychicPokemon = screen.getByTestId(id);
    expect(secondPsychicPokemon).toHaveTextContent(/mew/i);
  });
  test('O botão All precisa estar sempre visível', async () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeVisible();
  });
  test('O texto do botão deve ser All.', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toHaveTextContent(/all/i);
  });
  test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado.', async () => {
    const { user } = renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const nextPokemonBtn = screen.getByRole('button', { name: btnRegex });
    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    await user.click(psychicBtn);

    const psychicPokemon = screen.getByTestId(/pokemon-name/i);
    expect(psychicPokemon).toHaveTextContent(/alakazam/i);

    await user.click(btnAll);
    const firstOfAllPokemon = screen.getByTestId(/pokemon-name/i);
    expect(firstOfAllPokemon).toHaveTextContent(/pikachu/i);
    await user.click(nextPokemonBtn);
    const secondOfAllPokemon = screen.getByTestId(/pokemon-name/i);
    expect(secondOfAllPokemon).toHaveTextContent(/charmander/i);
  });
  test('O texto do botão deve ser All.', async () => {
    const { user } = renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByText(btnRegex);
    await user.tripleClick(nextPokemonBtn);

    const nextPokemon = screen.getByTestId('pokemon-name');

    expect(nextPokemon).toHaveTextContent(/ekans/i);
  });
});
