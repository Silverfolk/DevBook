import axios from 'axios';
import { setAlert } from './alert';
import { ADD_POST,
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT } from './types';

// GET POSTS 

export const getPosts= () => async dispatch=>{
    try{
        const res=await axios.get('http://localhost:5000/api/post');
         console.log(res.data);
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    }
    catch(err){
        console.log(err);
      dispatch({
        type:POST_ERROR,
        payload:{msg:err.response,status:err.response}
      })
    }

}

//Add like
export const addLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/post/like/${postId}`);
         console.log(res.data);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });
        dispatch(
            setAlert("Like Added", 'success')
        );
    } catch (err) {
        dispatch(
            setAlert(err.response?.data?.msg, 'danger')
        );
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response?.data?.msg,
                status: err.response?.status,
            },
        });
    }
};

//Remove like
export const removeLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/post/unlike/${postId}`);
    
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });
        dispatch(
            setAlert("Removed Liked", 'success')
        );
    } catch (err) {
        console.log(err,"remvoeLike");
        dispatch(
            setAlert(err.response?.data?.msg, 'danger')
        );
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response?.data?.msg,
                status: err.response?.status,
            },
        });
    }
};

//Delete post
export const deletePost = (postId) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/post/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId,
        });

        dispatch(setAlert('Post Removed', 'success'));
        getPosts();
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response?.data?.msg,
                status: err.response?.status,
            },
        });
    }
};


//Add post
export const addPost = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post(`http://localhost:5000/api/post`, formData, config);
        console.log(res.data.post);
        dispatch({
            type: ADD_POST,
            payload: res.data.post,
        });


        dispatch(setAlert('Post Created', 'success'));
        getPosts();
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response?.data?.msg,
                status: err.response?.status,
            },
        });
    }
};

//get post
export const getPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/post/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Add comment
export const addComment = (postId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post(
            `http://localhost:5000/api/post/comment/${postId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await axios.delete(
            `http://localhost:5000/api/comment/${postId}/${commentId}`
            // `http://localhost:5000/api/comment/${commentId}`
        );

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};