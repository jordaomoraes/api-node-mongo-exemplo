import { Request, Response } from "express";
import api from '../resources/api';


const API_KEY = '9738ec8526dac005e183945f2a2407cd'

 class MoviesController {
  async index(req:Request, res:Response) {
    let allmovies = [];
    try {
      for (let i = 1; i <= 4; i++) {
        const { data } = await api.get(`/movie/top_rated?language=pt-BR&page=${i}&api_key=${API_KEY}`);
        allmovies.push(data.results);
      }

      return res.status(200).json(allmovies)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async filterMovies(req:Request, res:Response) {
    let allmovies = [];
    let category = '';

      const params1 = req.query.category;
      const params2 = req.query.numberpages;
  
    //seleciona de acordo com o que usuario pediu, entre 4 categorias,
    //e o numero de paginas que ele quer exibir
   // var chooseCategory = req.params.category;
   const chooseCategory = Number(params1);
   const numberPages = Number(params2)

    //verificação pra qtd de páginas minimas
    if (numberPages > 10) {
      return res.status(400).json({ "error": "Muitas páginas" })
    }

    //verificações para de acordo com o escolhido, passar um parametro para a rota
    if (chooseCategory === 1) {
      category = 'now_playing';
    }
    if (chooseCategory === 2) {
      category = 'popular';
    }
    if (chooseCategory === 3) {
      category = 'top_rated';
    }
    if (chooseCategory === 4) {
      category = 'upcoming';
    }

    try {
      for (let i = 1; i <= numberPages; i++) {
        const { data } = await 
        api.get(`/movie/${category}?language=pt-BR&page=${i}&api_key=${API_KEY}`);
        allmovies.push(data.results);
      }

      return res.status(200).json(allmovies)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }



}
module.exports = MoviesController;