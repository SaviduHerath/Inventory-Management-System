package backend.backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity


public class InventoryModel {

    @Id
    @GeneratedValue
    private Long id;
    private String itemImage;
    private String itemName;
    private String itemCategory;
    private String itemDetails;

    public InventoryModel(){

    }

    public InventoryModel(Long id, String itemImage, String itemName, String itemCategory, String itemDetails) {
        this.id = id;
        this.itemImage = itemImage;
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.itemDetails = itemDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(String itemDetails) {
        this.itemDetails = itemDetails;
    }
}

