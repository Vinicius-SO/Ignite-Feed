import { Post } from "./components/Post"
import { Header } from './components/Header'
import { Sidebar } from "./components/sidebar"
import styles from "./App.module.css"
import "./global.css"

const posts = [
  {
    id: 1,
    author:{
      avatarUrl: "https://github.com/Vinicius-SO.png",
      name: "Vinicius Soares Oliveira",
      role: "FrontEnd Developer"
    },
    content:[
      {type:'paragraph', content: 'Fala galeraa 👋'},
      {type:'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type:'link', content: 'jane.design/doctorcare'}
    ],
    publishedAt: new Date('2022-08-05 21:00:00')
  },
  {
    id: 2,
    author:{
      avatarUrl: "https://github.com/maykbrito.png",
      name: "mayk brito",
      role: "Educator @Rocketseat"
    },
    content:[
      {type:'paragraph', content: 'Fala galeraa 👋'},
      {type:'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type:'link', content: 'jane.design/doctorcare'}
    ],
    publishedAt: new Date('2022-08-05 21:00:00')
  },
]


function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map((post)=> (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          )
          )}
        </main>
      </div>
    </>
    
  )
}

export default App
