import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve ter o texto Home.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });

    expect(home).toBeInTheDocument();
  });
  test('O segundo link deve ter o texto About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });

    expect(about).toBeInTheDocument();
  });
  test('O terceiro link deve ter o texto Favorite Pokémon.', () => {
    renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(favorites).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página correta.', () => {
  test('Ao clicar no link Home da barra de navegação, redireciona a página para rota "/".', async () => {
    const { user } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    await user.click(home);
    expect(home).toBeInTheDocument();
  });

  test('Ao clicar no link About da barra de navegação, redireciona a página para rota "/about".', async () => {
    const { user } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    await user.click(about);
    expect(about).toBeInTheDocument();
  });

  test('Ao clicar no link Favorite Pokémon da barra de navegação, redireciona a página para rota "/favorites".', async () => {
    const { user } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favorites);
    expect(favorites).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
    renderWithRouter(<App />, { route: '/not-found-page' });

    expect(screen.getByText(/page requested not found/i)).toBeInTheDocument();
    expect(screen.getByText(/this page was not found!/i)).toBeInTheDocument();
    expect(screen.getByText(/but don't worry, this has nothing to do with team rocket!/i)).toBeInTheDocument();
  });
});
