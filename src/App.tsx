import type { Component } from 'solid-js'
import { createStore } from 'solid-js/store'
import { invoke } from '@tauri-apps/api/tauri'

import logo from './logo.svg';

const App: Component = () => {
  const [fields, setFields] = createStore()

  const handleHelloWorld = async () => {
    try {
      const response = await invoke('hello_world_test', {
        event: fields.main || 'nope',
      })
      setFields('response', `${response}`)
      console.log('response ', response)
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <div class='app'>
      <header class='app-header'>
        <div class='component-wrapper'>
          <img src={logo} class='logo' alt="logo" />
          <div class="inputs-container">
            <input
              onInput={(e) => setFields('main', e.target.value)}
              placeholder='input for rust'
              maxLength={48}
            />
            <button onClick={handleHelloWorld}>Call Rust</button>
          </div>
          <p>response message: {!!fields.response && `${fields.response}`}</p>
        </div>
      </header>
    </div>
  )
}

export default App
