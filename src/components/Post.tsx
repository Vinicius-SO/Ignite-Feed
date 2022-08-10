import { format, formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { Comment } from './Comment.jsx'
import { Avatar } from "./Avatar"
import styles from "./Post.module.css"
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';


interface Content {
    type: 'paragraph' | 'link'
    content:string
}

interface PostProps {
    author: {
        name: string
        role: string
        avatarUrl: string
    },
    publishedAt: Date,
    content:Content[]
}

export function Post({author, publishedAt, content}:PostProps){
    const publisheadAtFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale:ptBr})
    

    const [newCommentText, setNewCommentText] = useState('')
    const [comments, setComments] = useState([
        "Post muito bacana",
       
    ])

    function handleInvalidTextArea(event:InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatorio')
    }

    function handleCreateNewComment (event:FormEvent){
        event.preventDefault()
        
        setComments([...comments, newCommentText])
        setNewCommentText('')
    }
    
        function handleCommentChange(event:ChangeEvent<HTMLTextAreaElement>){
            event.target.setCustomValidity('')
            setNewCommentText(event.target.value);
        }

    function deleteComment(comment:string){
        const commentWithOutDeleteOne = comments.filter(commentToDelete => {
            return comment !== commentToDelete
        })
       
        setComments(commentWithOutDeleteOne)
    }
    

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
        locale: ptBr,
        addSuffix: true
    })

    const isNewCommentEmpty = newCommentText.length === 0
    
    
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title="" dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu comentario</strong>
                
                <textarea 
                    onChange={handleCommentChange} 
                    value={newCommentText} 
                    name='comment' 
                    placeholder="Deixe seu comentario"
                    onInvalid={handleInvalidTextArea}
                    required
                />

                <footer>
                    <button disabled={isNewCommentEmpty} type="submit">Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment=>(
                    <Comment onDeleteComment={deleteComment} key={comment} content={comment} />
                )
                )}
            </div>
        </article>
    )
}