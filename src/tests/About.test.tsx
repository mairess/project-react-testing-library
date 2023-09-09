import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.tsx />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const infos = screen.getByText(/what does this app do?/i);
    const pokedex = screen.getByAltText(/pokédex/i);

    expect(infos).toBeInTheDocument();
    expect(pokedex).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const heading = screen.getByRole('heading', { name: /about pokédex?/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const paragraphOneText = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.';
    const paragraphTwoText = 'One can filter Pokémon by type, and see more details for each one of them.';

    const paragraphOne = screen.getByText(paragraphOneText);
    const paragraphTwo = screen.getByText(paragraphTwoText);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const image = screen.getByRole('img', { name: /pokédex/i });
    const source = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toHaveAttribute('src', source);
  });
});
