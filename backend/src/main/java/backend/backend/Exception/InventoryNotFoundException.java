package backend.backend.Exception;

public class InventoryNotFoundException extends RuntimeException{
    public InventoryNotFoundException(Long id){
        super("Inventory not found with id "+id);
    }
    public InventoryNotFoundException(String message){
        super(message);
    }
}
