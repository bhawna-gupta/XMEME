//Database-Collection Schema
module.exports = mongoose => {
    var schema = mongoose.Schema(
    {
          name:{
            type:String,
            required:true
          },          
          caption:{
            type:String,
            required:true
          },
          url:{
              type:String,
              required:true
          }
      }
    );

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    schema.index({name:1, caption:1, url: 1}, { unique: true });
  
    const Meme = mongoose.model("meme", schema);
    return Meme;
  };