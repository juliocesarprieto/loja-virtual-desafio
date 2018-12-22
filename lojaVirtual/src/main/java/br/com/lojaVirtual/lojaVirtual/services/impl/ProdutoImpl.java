package br.com.lojaVirtual.lojaVirtual.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.lojaVirtual.lojaVirtual.models.Produto;
import br.com.lojaVirtual.lojaVirtual.repositorys.ProdutoRepository;
import br.com.lojaVirtual.lojaVirtual.services.ProdutoService;

@Service
public class ProdutoImpl implements ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	@Override
	public Produto save(Produto produto) {
		// ByteBuffer imageBytes = ByteBuffer.wrap(Base64.decodeBase64(produto.get));
		return produtoRepository.save(produto);
	}

	@Override
	public void deleteById(Long id) {
		produtoRepository.deleteById(id);
	}

	@Override
	public List<Produto> findAll() {
		return produtoRepository.findAll();
	}

}
