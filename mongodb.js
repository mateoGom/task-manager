const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if (error){
       return console.log('unable to connect to the server')
    }

    const db=client.db(databaseName)

    // db.collection('users').insertOne({
    //     name:'mat',
    //     age:23
    // })

    db.collection('users').insertMany([
        {
            name:'juana',
            age:56
        },{
            name:'pablo',
            age:34
        }
    ],(error,result)=>{
        if(error){
            return console.log('unable to insert the user')
        }
        console.log(result.ops)
    })

})