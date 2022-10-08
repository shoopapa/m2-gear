import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { View } from "react-native";

import {  ThemeType } from "../../styles";
import { Button, Drawer } from "react-native-paper";
import { Tag } from "../../models";
import { Alert, Modal, Text } from "react-native";

import { SelectableTag } from "../../utils/save-session";
import { styles } from "./styles";

type TagProps = {
  tag: SelectableTag;
  setTag: () => void;
  isSelected: Boolean;
};

const Tags = ({ tag, setTag, isSelected }: TagProps) => {
  return (
    <Button
      color="gray"
      style={{
        backgroundColor: isSelected ? "rgba(0,100,0,0.12)" : "rgba(0,0,0,0)",
        margin: 2,
      }}
      mode="text"
      onPress={setTag}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{tag.name}</Text>
        <Text>{tag.value} </Text>
      </View>
    </Button>
  );
};

type SaveModalProps = {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  theme: ThemeType;
  onSave: (tags: Tag[], selectedTags: { [key: string]: Boolean }) => void;
};

export const SaveModal = ({
  modalVisible,
  setModalVisible,
  theme,
  onSave,
}: SaveModalProps) => {
  const { colors } = theme;
  const [tags, settags] = useState<Tag[]>([]);
  const [selectedTags, setselectedTags] = useState<{ [key: string]: Boolean }>(
    {}
  );

  useEffect(() => {
    const init = async () => {
      let tags = await DataStore.query(Tag);
      settags(tags);
    };
    init();
  }, []);

  const setTag = (Tag: Tag) => {
    setselectedTags({
      ...selectedTags,
      [Tag.id]: !selectedTags[Tag.id],
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Drawer.Section title="Tags" style={{ width: "100%" }}>
            {tags.map((t) => (
              <Tags
                tag={t}
                key={t.id}
                isSelected={selectedTags[t.id]}
                setTag={() => setTag(t)}
              />
            ))}
          </Drawer.Section>
          <View style={{ width: "100%", justifyContent: "space-between" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.primary,
                  margin: "5%",
                  width: "40%",
                }}
                onPress={() => onSave(tags, selectedTags)}
              >
                Save
              </Button>
              <Button
                mode="contained"
                style={{
                  backgroundColor: colors.error,
                  margin: "5%",
                  width: "40%",
                }}
                onPress={async () => {
                  setModalVisible(false);
                }}
              >
                cancel
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
