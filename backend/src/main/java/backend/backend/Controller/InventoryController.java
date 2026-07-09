package backend.backend.Controller;

import backend.backend.Exception.InventoryNotFoundException;
import backend.backend.Model.InventoryModel;
import backend.backend.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryRepository inventoryRepository;

    //Insert
    @PostMapping("/inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel){
        return inventoryRepository.save(newInventoryModel);
    }

    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam ("file")MultipartFile file){
        String folder = "src/main/Upload/";
        String itemImage = file.getOriginalFilename();
        try{
            File uploadDir = new File(folder);
            if(!uploadDir.exists()){
                uploadDir.mkdir();

            }
            file.transferTo(Path.of(folder, itemImage));
        }catch (IOException e){
            e.printStackTrace();
            return "error,"+ itemImage ;
        }
        return itemImage;
    }

    //Display
    @GetMapping("/inventory")
    List<InventoryModel> getAllItems(){
        return inventoryRepository.findAll();
    }

    @GetMapping("/inventory/{id}")
    InventoryModel getItemById(@PathVariable Long id){
        return inventoryRepository.findById(id).orElseThrow(()-> new InventoryNotFoundException(id));
    }

    private final String UPLOAD_DIR = "src/main/upload/";

    @GetMapping("/upload/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename){
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }

    //Update
    @PutMapping("/inventory/{id}")
    public InventoryModel updateItem(
        @RequestBody InventoryModel newInventory,
        @PathVariable Long id
    ){
        return inventoryRepository.findById(id).map(existingInventory ->{
            existingInventory.setItemName(newInventory.getItemName());
            existingInventory.setItemCategory(newInventory.getItemCategory());
            existingInventory.setItemDetails(newInventory.getItemDetails());
            
            if (newInventory.getItemImage() != null && !newInventory.getItemImage().isEmpty()){
                existingInventory.setItemImage(newInventory.getItemImage());
            }
            
            return inventoryRepository.save(existingInventory);
        }).orElseThrow(()->new InventoryNotFoundException(id));
    }
}
