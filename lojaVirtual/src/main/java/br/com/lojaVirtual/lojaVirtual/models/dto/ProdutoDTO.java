package br.com.lojaVirtual.lojaVirtual.models.dto;

import br.com.lojaVirtual.lojaVirtual.models.Produto;

public class ProdutoDTO {

	private Long id;
	private String nomeProduto;
	private String descricaoProduto;
	private Double precoProduto;

	public ProdutoDTO(Produto produto) {
		super();
		this.id = produto.getId();
		this.nomeProduto = produto.getNomeProduto();
		this.descricaoProduto = produto.getDescricaoProduto();
		this.precoProduto = produto.getPrecoProduto();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
	}

	public String getDescricaoProduto() {
		return descricaoProduto;
	}

	public void setDescricaoProduto(String descricaoProduto) {
		this.descricaoProduto = descricaoProduto;
	}

	public Double getPrecoProduto() {
		return precoProduto;
	}

	public void setPrecoProduto(Double precoProduto) {
		this.precoProduto = precoProduto;
	}
}
