module.exports = {

    //Using the body form-data at Postman POST request
    async upload(req, res, next) {
        try {
            if(!req.files) {
                res.status(400).send({
                    status: false,
                    message: 'No file uploaded!'
                });
            }
            const file = req.files['file\n'];

            console.log(req.files);
            file.mv('./assets/uploads/' + file.name);

            res.send({
                status: true,
                message: 'File uploaded!',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        } catch (error) {
            next(error);
        }
    }
}