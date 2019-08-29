import React from 'react'
import YouTube from 'react-youtube' 

const PageNotFound = () => {

    const playerOptions = {
        height: '400', width: '600', playerVars: { autoplay: 1 }
    }

    return <div><h3>404 Page Not Found</h3><YouTube videoId="1VbriKJQywQ" opts={ playerOptions } /></div>
}

export default PageNotFound
