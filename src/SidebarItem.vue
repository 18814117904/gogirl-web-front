<template>
    <div>
        <div v-for="item in routes" :key="item.url">
            <router-link v-if="item.children.length == 0" :to="'/'+item.url">
                <el-menu-item :index="item.url">
                    <!--<wscn-icon-svg v-if='item.icon' :icon-class="item.icon" />--> {{item.title}}
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.title" v-if="item.children.length > 0">
                <template slot="title">
                    <!--<wscn-icon-svg v-if='item.icon' :icon-class="item.icon" />--> {{item.title}}
                </template>
                <div v-for="child in item.children" :key="child.url">
                    <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link v-else class="menu-indent" :to="'/'+child.url">
                        <el-menu-item :index="'/'+child.url">
                            {{child.title}}
                        </el-menu-item>
                    </router-link>
                </div>
            </el-submenu>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        }
    },

  mounted: function () {
   console.log("=======", this.routes)
  }
}
</script>

<style scoped>

  >>> .el-menu-item {
  color: #a7b1c2;
}

>>> .el-submenu__title:hover {
  outline: 0;
  background-color: rgba(51, 47, 60, 0.82);
}

  >>> .el-menu{
  background-color: #2f4050;
}

>>> .el-menu-item:focus, .el-menu-item:hover {
  outline: 0;
  background-color: rgba(51, 47, 60, 0.82);
}

>>> .el-submenu__title {
  color: #a7b1c2;
}
>>> .el-menu-item.is-active{
  color: #337ab7
}
  >>> a {
    color: #337ab7
  }
</style>

