package br.com.lojaVirtual.lojaVirtual.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.lojaVirtual.lojaVirtual.models.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
