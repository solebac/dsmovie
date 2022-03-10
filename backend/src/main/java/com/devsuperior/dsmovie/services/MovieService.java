package com.devsuperior.dsmovie.services;


import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.repositories.MovieRepository;

@Service
public class MovieService {
	@Autowired
	private MovieRepository repository;
	
	@Transactional(readOnly = true)
	public Page<MovieDTO> findAll(Pageable page){
		Page<Movie> list = repository.findAll(page);
		//x -> new MovieDTO(x)
		Page<MovieDTO> pg = list.map(MovieDTO::new);
		return pg;
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id){
		Optional<Movie> obj = repository.findById(id);
		if (obj.isPresent()) {
			MovieDTO dto = new MovieDTO(obj.get());
			return dto;
		}
		throw new RuntimeException("Dados not found");
	}
	
}
