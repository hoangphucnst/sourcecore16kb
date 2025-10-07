import React, {forwardRef} from 'react'
import {FlatList, FlatListProps, LayoutAnimation} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useDebounce} from '~/hooks'

type AppFlatListProps<ItemT> = FlatListProps<ItemT> & {
  // Define any additional props if needed
  horizontalInit?: 0 | number
}

const AppFlatList = forwardRef<FlatList<any>, AppFlatListProps<any>>(
  ({horizontalInit = 0, contentContainerStyle, ...props}, ref) => {
    const insets: EdgeInsets = useDebounce(useSafeAreaInsets(), 20)
    React.useEffect(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [insets])

    // Add any custom behavior or styling here
    return (
      <FlatList
        ref={ref}
        contentContainerStyle={[
          {
            paddingLeft: insets.left + horizontalInit,
            paddingRight: insets.right + horizontalInit,
          },
          contentContainerStyle,
        ]}
        {...props}
      />
    )
  },
)
AppFlatList.displayName = 'AppFlatList'
export default AppFlatList

/*
Example:
  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
  ];

  const renderItem = ({ item }: { item: { title: string } }) => (
    <View style={{ padding: 20 }}>
      <Text>{item.title}</Text>
    </View>
  );

  const MyComponent = () => {
    return (
      <AppFlatList
        data={data} // Data for the FlatList
        renderItem={renderItem} // Render function for each item
        keyExtractor={(item) => item.id} // Unique identifier for each item
        horizontalInit={10} // Optional horizontal padding (customizable)
        contentContainerStyle={{ backgroundColor: 'lightgray' }} // Custom style for content container
      />
    );
  };
*/
