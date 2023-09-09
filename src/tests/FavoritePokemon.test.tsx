import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemon.tsx />', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const messageText = 'No favorite Pokémon found';
    const noFavoriteMessage = screen.getByText(messageText);
    expect(noFavoriteMessage).toBeInTheDocument();
  });

  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    /* need review here */
    const { user } = renderWithRouter(<App />);
    await user.click(screen.getByText(/more details/i));
    await user.click(screen.getByText(/pokémon favoritado\?/i));
    await user.click(screen.getByRole('link', { name: /favorite pokémon/i }));
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
