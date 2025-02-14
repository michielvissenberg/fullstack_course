const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div> 
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return(<p>Number of exercises {total}</p>)
}

export const Course = ({courses}) => (
    <div>
      {courses.map(course => 
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
  