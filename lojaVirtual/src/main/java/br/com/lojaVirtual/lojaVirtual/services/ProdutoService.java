package br.com.lojaVirtual.lojaVirtual.services;

import java.util.List;

import br.com.lojaVirtual.lojaVirtual.models.Produto;

public interface ProdutoService {

	Produto save(Produto produto);

	void deleteById(Long id);

	List<Produto> findAll();
}
