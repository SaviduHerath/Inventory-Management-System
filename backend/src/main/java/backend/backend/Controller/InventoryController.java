package backend.backend.Controller;

import backend.backend.Model.InventoryModel;
import backend.backend.Repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

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

}
