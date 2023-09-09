import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<App />, { route: '*' });
    const regEx = /page requested not found/i;
    const heading = screen.getByRole('heading', { name: regEx, level: 2 });
    expect(heading).toHaveTextContent(regEx);
  });
  test('Teste se a página mostra a imagem com o atlText e src corretos.', () => {
    renderWithRouter(<App />, { route: '*' });
    const altText = "Clefairy pushing buttons randomly with text I have no idea what i'm doing";
    const src = '/404.gif';
    const imageNoFound = screen.getByRole('img');
    expect(imageNoFound).toHaveAttribute('alt', altText);
    expect(imageNoFound).toHaveAttribute('src', src);
  });
});
