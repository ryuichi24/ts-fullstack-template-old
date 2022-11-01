import { render, screen, logDOM } from '@testing-library/react'
import App from './App'
import 'cross-fetch/polyfill'
 
test('App comp test', () => {
    render(<App />)
    screen.debug()
    logDOM(screen.getByText('React App'))
    const { container } = render(<App />)
    console.log({hey: container.innerHTML})
    expect(container.innerHTML).toMatch('React App')
})