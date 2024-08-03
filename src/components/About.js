import React from 'react';
import './About.scss';

const About = () => {
    return (
        <div className="about">
        <h1>About This Project</h1>
        <p>This project is a simple ToDoList application built with React. It allows users to add, delete, and mark tasks as completed. The tasks are saved in local storage to persist even after the browser is closed.</p>
        <h2>Developer</h2>
        <p>This application was developed by Vladislav.K.</p>
        </div>
    );
};

export default About;
