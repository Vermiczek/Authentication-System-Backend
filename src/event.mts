// const userSchema = new mongoose1.Schema({
//     name: String,
//     email:{
//       type:String,
//       required: true
//     },
//     createdAt: Date,
//     updatedAt: Date,
//     password: String
//   })

const eventSchema = new mongoose1.Schema({
    start_date: Date, 
    end_date: Date,
    title: String,
    password: String
  })
  
  
module.exports =  mongoose1.model("Event", eventSchema);