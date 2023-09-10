import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { route: 'pokemon/25' });
  });
  test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.', async () => {
    const name = screen.getByText(/pikachu details/i);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(/pikachu details/i);

    const detailsLink = screen.queryByText(/more details/i);
    expect(detailsLink).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/summary/i);

    const message = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';
    const paragraph = screen.getByText(message);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toBeVisible();
    expect(paragraph).toHaveTextContent(message);

    const headingLocation = screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    expect(headingLocation).toBeInTheDocument();

    const maps = screen.getAllByAltText(/pikachu location/i);
    expect(maps).toHaveLength(2);
    expect(maps[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(maps[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(maps[1]).toHaveAttribute('alt', 'Pikachu location');

    const nameMapOne = screen.getByText('Kanto Viridian Forest');
    const nameMapTwo = screen.getByText('Kanto Power Plant');

    expect(nameMapOne).toBeInTheDocument();
    expect(nameMapTwo).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    const label = screen.getByText(/pokémon favoritado\?/i);
    expect(label).toBeInTheDocument();

    await userEvent.click(checkbox);
    const favIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toBeInTheDocument();
    await userEvent.click(checkbox);
    expect(favIcon).not.toBeInTheDocument();
  });
});
