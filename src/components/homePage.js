/**
 * Created by krisztian on 10/09/16.
 */
import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <h2>Already implemented functionality</h2>

                <ul>
                <li>Registration and login</li>
                <li>Creation of learnItemLists</li>
                <li>Adding LearnItems (words/expressions) to existing lists</li>
                <li>Subscribing to lists</li>
                <li>Practicing learnItems (after correct answer, the item doesn’t appear for the next 24 hours)</li>
                <li>Editing lists (editing list name, description, deleting learnItems from list) - every user can subscribe to any list, but can only edit the ones created by them</li>
                <li>Built in dictionary when adding learnItems based on the list’s specified languages</li></ul>

                <h2>Things that are not implemented yet</h2>
                <ul>
                <li>Settings page</li>
                <li>Collected points are not sent to the server yet (however, the results themselves are stored, and taken into consideration when selecting the next learnItems to learn)</li>
                </ul>
            </div>
        );
    }
}

export default Home;