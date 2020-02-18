
localStorage.setItem('projects', [])

const createProject = () => {
  const dom = domComponents()
  const title = dom.projectTitle.value
  const project = objects.project(title)
  console.log(project)
  dom.renderObject(title)
  localStorage.setItem('projects', project)
}

export default createProject