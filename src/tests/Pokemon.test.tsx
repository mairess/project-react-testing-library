import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  const pokemonImageURL = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
  const pokemon = {
    averageWeight: { measurementUnit: 'kg', value: '6' },
    foundAt: [],
    id: 1,
    image: pokemonImageURL,
    moreInfo: '',
    name: 'Pikachu',
    summary: '',
    type: 'Electric',
  };

  beforeEach(() => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink
        isFavorite
      />,
    );
  });

  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
    const pokemonType = screen.getByTestId(/pokemon-type/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/electric/i);
  });

  test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, em que <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida.', () => {
    const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6 kg/i);
  });

  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, em que <name> é o nome do Pokémon.', () => {
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', pokemonImageURL);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, em que <name> é o nome do Pokémon.', () => {
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', pokemonImageURL);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('O ícone deve ser uma imagem com o atributo src que contém o caminho /star-icon.png.', () => {
    const favIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(favIcon).toHaveAttribute('src', '/star-icon.png');
  });

  test('É exibido na tela um link com o href /pokemon/<id>.', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemon/1');
  });
});
