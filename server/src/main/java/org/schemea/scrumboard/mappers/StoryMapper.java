package org.schemea.scrumboard.mappers;

import org.apache.ibatis.annotations.Select;
import org.schemea.scrumboard.entities.StoryEntity;

import java.util.UUID;

public interface StoryMapper extends SqlMapper<StoryEntity> {
    @Select("SELECT * FROM stories WHERE id = #{toString()}")
    StoryEntity findByID(UUID id);

    @Select("SELECT * FROM stories WHERE title = #{title}")
    StoryEntity findByTitle(String title);
}
