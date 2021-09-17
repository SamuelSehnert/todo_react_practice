import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header'
import Todo from './Todo/Todo'
import CharacterSheet from './CharacterSheet/CharacterSheet'


export default function TabGroup() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/todo'>
                    <main>
                        <Todo />
                    </main>
                </Route>
                <Route exact path='/character-sheet'>
                    <main>
                        <CharacterSheet />
                    </main>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}