package backend.backend.Repository;

import backend.backend.Model.InventoryModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<InventoryModel,Long> {
}
