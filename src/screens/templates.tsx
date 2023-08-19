import { useNavigation } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { StorageContext } from '../storage/context'
import { instantiateTemplate } from '../storage/util'
import { ds, styles } from '../ux/design'
import { icons } from '../ux/icons'
import { IconButton } from '../views/iconbutton'
import { ViewTemplate } from './viewtemplate'
import { ChecklistTemplate } from '../storage/interfaces'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MinorText } from '../views/text'
import { makeConfirmDialog } from '../views/dialogs'

function Templates() {
  const { templates, removeTemplate, saveChecklist } =
    useContext(StorageContext)

  const navigate = useNavigation()
  const [viewSingleTemplate, setViewSingleTemplate] =
    useState<ChecklistTemplate | null>(null)

  return (
    <View style={{ flex: 1 }}>
      {viewSingleTemplate !== null ? (
        <ViewTemplate
          template={viewSingleTemplate}
          navigateBack={() => {
            setViewSingleTemplate(null)
          }}
        />
      ) : (
        <ScrollView
          style={{ flex: 1, paddingBottom: 260 }}
          contentContainerStyle={{ flexGrow: 1 }}>
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onInstantiate={() => {
                const checklist = instantiateTemplate(template)
                saveChecklist(checklist)
                // @ts-ignore
                navigate.navigate('Checklists')
              }}
              onView={() => {
                setViewSingleTemplate(template)
              }}
              onRemove={() => {
                makeConfirmDialog(
                  `Remove template`,
                  `Are you sure you want to remove ${template.label}?`,
                  () => removeTemplate(template.id),
                )
              }}
              onCopy={() => {
                // @ts-ignore
                navigate.navigate('Make template', {
                  templateId: template.id,
                  isNew: true,
                })
              }}
              onEdit={() => {
                // @ts-ignore
                navigate.navigate('Make template', {
                  templateId: template.id,
                  isNew: false,
                })
              }}></TemplateCard>
          ))}
          <View
            style={{ paddingTop: ds.sizes.hoverButton + ds.sizes.m }}></View>
        </ScrollView>
      )}
      <View
        style={
          styles.hoverButton
          // position: 'absolute',
          // bottom: ds.sizes.l,
          // right: ds.sizes.l,
          // backgroundColor: ds.colors.highlight1,
          // borderRadius: ds.sizes.hoverButton,
          // width: ds.sizes.hoverButton,
          // height: ds.sizes.hoverButton,
          // justifyContent: 'center',
          // alignItems: 'center',
          // elevation: ds.elevation,
        }>
        <IconButton
          onPress={() => {
            console.log('Pressed!')
            // @ts-ignore
            navigate.navigate('Make template', {
              templateId: null,
              isNew: true,
            })
          }}
          icon={icons.plus}></IconButton>
      </View>
    </View>
  )
}

type TemplateCardProps = {
  onInstantiate: () => void
  template: any
  onEdit: () => void
  onRemove: () => void
  onCopy: () => void
  onView: () => void
}
function TemplateCard(props: TemplateCardProps) {
  return (
    <View
      style={{
        paddingVertical: ds.sizes.m,
        paddingHorizontal: ds.sizes.s,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: ds.colors.secondary,
        marginTop: ds.sizes.s,
        marginHorizontal: ds.sizes.s,
        borderRadius: ds.border.radius,
      }}>
      <View>
        <TouchableOpacity onPress={props.onInstantiate}>
          <MinorText>{props.template.label}</MinorText>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {/* <IconButton
          iconStyle={{ paddingHorizontal: ds.padding.s }}
          onPress={props.onView}
          icon={icons.eye}></IconButton> */}

        {/* FIXME: Remove, bake into the template display */}
        <IconButton
          iconStyle={{ paddingHorizontal: ds.sizes.s }}
          onPress={props.onEdit}
          icon={icons.pen}></IconButton>

        <IconButton
          iconStyle={{ paddingHorizontal: ds.sizes.s }}
          onPress={props.onRemove}
          icon={icons.trash}></IconButton>
        {/* <IconButton
          iconStyle={{ paddingHorizontal: ds.padding.s }}
          onPress={props.onCopy}
          icon={icons.copy}></IconButton> */}
        {/* <IconButton
          iconStyle={{ paddingHorizontal: ds.padding.s }}
          onPress={() => {
            console.log(
              `${props.template.label} ${props.template.id} ${JSON.stringify(
                props.template.stacks,
                null,
                2,
              )}`,
            )
          }}
          icon={icons.info}></IconButton> */}
      </View>
    </View>
  )
}

export default Templates
