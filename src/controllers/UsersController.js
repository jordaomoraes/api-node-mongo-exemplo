const express = require("express");

const mongoose = require("mongoose");
require("../models/users")
const User = mongoose.model("users");
class UsersControlle {

  async create(req, res) {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      publicWishlist:req.body.public
    };
    new User(newUser)
      .save()
      .then(() => {
        return res.status(200).json({ message: "User Cadastrado com Sucesso" })
      }).catch((erro) => {
        return res.status(400).json({ error: erro.message })
      })
  }
  async createWishList(req, res) {
    await User.findOne({ _id: req.body.id }).then(userFind => {
      var desejos = {
        title: req.body.wishList.title,
        note: req.body.wishList.note,
        stars: req.body.wishList.stars,
        comentary:req.body.wishList.comentary,
        publicAvaliation:req.body.wishList.public
      }
      if (desejos.note < 5 | desejos.note > 10) {
        return res.status(400).json({ "Message": " Nota Inválida, deve ser entre 5 e 10" })
      }
      if (desejos.stars < 1 | desejos.stars > 5) {
        return res.status(400).json({ "Message": "Dê entrelas entre 1 e 5" })
      }
      userFind.wishList.push(desejos)
      userFind.save().then(() => {
        return res.status(200).json({ "Message": " Lista de Desejos Atualizada" })
      }).catch((error) => {
        console.log(error)
        return res.status(200).json({ "Message": " Erro ao Inserir Filme na lista de desejos" })
      })
    })
  }
  
  async editWishList(req, res) {
    await User.findOne({ _id: req.body.id }).then(user => {
      //validacao
      if (req.body.note < 5 | req.body.note > 10) {
        return res.status(400).json({ "Message": " Nota Inválida, deve ser entre 5 e 10" })
      }
      if (req.body.stars < 1 | req.body.stars > 5) {
        return res.status(400).json({ "Message": "Dê entrelas entre 1 e 5" })
      }
      //percorre o userwishList buscando a lista, caso encontre com o IDMovie, ele altera
      for (let i in user.wishList) {
       
        if (user.wishList[i]._id == req.body.idMovie) {
            user.wishList[i].note = req.body.note,
            user.wishList[i].stars = req.body.stars
        user.save().then(() => {
            return res.status(200).json({ "Message": " Notas e Estrelas Atualizadas" })
          }).catch((error) => {
            console.log(error)
            return res.status(200).json({ "Message": " Erro ao Atualizar as Estrelas" })
          })
        }
      }
    })
  }
  async index(req, res) {
    User.find().then(userFind => {
      return res.status(200).json(userFind)
    })
  }

}

module.exports = UsersControlle;