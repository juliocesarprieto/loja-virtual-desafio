package br.com.lojaVirtual.lojaVirtual.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.lojaVirtual.lojaVirtual.models.Produto;
import br.com.lojaVirtual.lojaVirtual.services.ProdutoService;

@RestController
@RequestMapping("/api/produto")
public class ProdutoResource {

	@Autowired
	private ProdutoService produtoService;

	@CrossOrigin("*")
	@GetMapping
	public ResponseEntity<List<Produto>> retornarProdutos() {
		return ResponseEntity.ok().body(produtoService.findAll());
	}
	
	@CrossOrigin("*")
	@PostMapping
	public ResponseEntity<Produto> InserirProduto(@RequestBody Produto produto) {
		Produto produtoSalvo = produtoService.save(produto);
		return ResponseEntity.ok().body(produtoSalvo);
	}

	@CrossOrigin("*")
	@PutMapping
	public ResponseEntity<Produto> atualizarProduto(@RequestBody Produto produto) {
		Produto produtoSalvo = produtoService.save(produto);
		return ResponseEntity.ok().body(produtoSalvo);
	}

	@CrossOrigin("*")
	@DeleteMapping("/{id}")
	public void removerProduto(@PathVariable Long id) {
		produtoService.deleteById(id);
	}

}
