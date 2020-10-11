export const getblog = () => fetch("http://localhost:5000/blog/posts").then(res => res.json())

export const createblog = (post) => fetch("http://localhost:5000/blog/post", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    'Content-Type':'application/json'
  },
  body: JSON.stringify(post)
})  

export const edit = (id) => fetch(`http://localhost:5000/blog/edit/${id}`, {
  method: "PUT",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body:JSON.stringify()
 
})  
export const deleteb = (id) => fetch(`http://localhost:5000/blog/delete/${id}`, {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})  
export const getblogbyid = (id) => fetch(`http://localhost:5000/blog/posts/${id}`).then(res => res.json())