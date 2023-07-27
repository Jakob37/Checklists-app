import { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { StorageContext } from '../storage/context'
import {
  CheckboxStatus,
  Checklist,
  ChecklistTemplate,
} from '../storage/interfaces'
import { generateId } from '../util/util'
import { icons } from '../ux/icons'
import { IconButton } from '../views/iconbutton'
import { instantiateTemplate } from '../storage/util'
import { ds } from '../ux/design'

const PADDING = 10

function SelectChecklist({ navigation }) {
  const {
    templates,
    removeTemplate,
    saveChecklist: createChecklist,
  } = useContext(StorageContext)

  useEffect(() => {
    console.log('Run')
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {/* <TopBarIconButton
            icon={icons.bars}
            onPress={() => {
              navigation.navigate('Entries')
            }}></TopBarIconButton> */}
          {/* <TopBarIconButton
            icon={icons.floppy}
            onPress={handleSave}></TopBarIconButton> */}
          <IconButton
            onPress={() => navigation.navigate('Make template')}
            icon={icons.plus}
            color={ds.colors.darkgray}
            style={{ paddingRight: PADDING }}></IconButton>
        </View>
      ),
    })
  }, [])

  return (
    <View>
      {templates.map((template, i) => (
        <View
          key={String(i)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: PADDING,
            paddingLeft: PADDING,
          }}>
          <IconButton
            style={{ paddingHorizontal: PADDING }}
            onPress={() => {
              const checklist = instantiateTemplate(template)
              createChecklist(checklist)
            }}
            icon={icons.copy}
            label={template.label}></IconButton>
          <IconButton
            style={{ paddingHorizontal: PADDING }}
            onPress={() => {
              removeTemplate(template.id)
            }}
            icon={icons.trash}></IconButton>
        </View>
      ))}
    </View>
  )
}

export default SelectChecklist
