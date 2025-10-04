module.exports = {
    "/api": {
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
//        rewrite: (path) => path.replace(/^\/api/, ''),
    }   
}