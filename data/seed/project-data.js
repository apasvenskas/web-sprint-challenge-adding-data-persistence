const project = [
    {
      project_name: 'Build a website',
      project_description: 'Create a personal portfolio website using HTML, CSS and JavaScript',
      project_completed: false
    },
    {
      project_name: 'Learn React',
      project_description: 'Learn the basics of React and how to use it to create dynamic web applications',
      project_completed: true
    },
    {
      project_name: 'Write a blog post',
      project_description: 'Write a blog post about your experience with web development and share it on Medium',
      project_completed: false
    }
  ];
  

  const resources = [
    {
      resource_name: 'Codecademy',
      resource_description: 'An online platform that offers interactive courses on various programming languages and technologies'
    },
    {
      resource_name: 'W3Schools',
      resource_description: 'A web developers site that provides tutorials and references on web development topics'
    },
    {
      resource_name: 'Medium',
      resource_description: 'An online publishing platform that allows anyone to write and share their stories'
    }
  ];
  
 
  const task = [
    {
      task_description: 'Create a HTML file',
      task_notes: 'Use semantic elements and follow the best practices',
      task_completed: true,
      project_id: 1 // this refers to the first project in the project table
    },
    {
      task_description: 'Create a CSS file',
      task_notes: 'Use classes and ids to style the elements',
      task_completed: false,
      project_id: 1 // this refers to the first project in the project table
    },
    {
      task_description: 'Create a JavaScript file',
      task_notes: 'Use DOM manipulation and event listeners to add interactivity',
      task_completed: false,
      project_id: 1 // this refers to the first project in the project table
    },
    {
      task_description: 'Complete the React course on Codecademy',
      task_notes: 'Learn about components, props, state, hooks, and routing',
      task_completed: true,
      project_id: 2 // this refers to the second project in the project table
    },
    {
      task_description: 'Build a simple React app',
      task_notes: 'Use create-react-app to bootstrap a new app and deploy it on Netlify',
      task_completed: false,
      project_id: 2 // this refers to the second project in the project table
    },
    {
      task_description: 'Outline the main points of the blog post',
      task_notes: 'Think about what you want to share and why it is important',
      task_completed: true,
      project_id: 3 // this refers to the third project in the project table
    },
    {
      task_description: 'Write the first draft of the blog post',
      task_notes: 'Use clear and concise language and provide examples and screenshots if possible',
      task_completed: false,
      project_id: 3 // this refers to the third project in the project table
    },
  ];
  
  exports.seed = async function (knex) {
    await knex("project").insert(project);
    await knex("resources").insert(resources);
    await knex("task").insert(task);
  };
  