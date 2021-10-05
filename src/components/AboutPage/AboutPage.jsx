import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Welcome to Cache Box. This is a place for you to organize your personal projects. By creating an account a user can create a secure place online to track their projects. This allows for easy access to all of your current projects for quick reference for yourself or if you want to show off what you are working on!</p>
      </div>
    </div>
  );
}

export default AboutPage;
