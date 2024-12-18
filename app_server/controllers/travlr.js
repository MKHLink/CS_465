// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

const tripsEndpoint = 'http://localhost:3000/api/trips';
const option = {
    method:'GET',
    headers:{
        'Accept':'application/json'
    }
}

const travel = async function (req, res, next) {
    await fetch(tripsEndpoint, option)
            .then(res => res.json())
            .then(json=>{
                console.log(json);
                let msg = null;

                if(!(json instanceof Array)){
                    msg = "API error";
                    json = [];
                }else{
                    if(!json.length){
                        msg = "No trips found";
                    }
                }

                res.render('travel',{title: 'Travlr Getawats', trips: json, msg});
            })
            .catch(err=>res.status(500).send(e.message));
};

module.exports ={
    travel
};