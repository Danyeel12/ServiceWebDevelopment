module.exports = (mongoose) => {

    var schema = mongoose.Schema({

        type: String,

});

  schema.method("toJSON", function() {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;

  });

const Types = mongoose.model("types", schema);

  return Types;

};