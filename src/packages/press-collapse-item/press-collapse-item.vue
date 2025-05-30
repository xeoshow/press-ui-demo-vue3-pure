<template>
  <div :class="customClass + ' press-collapse-item ' + (index !== 0 ? 'press-hairline--top' : '')">
    <!-- 【修改点】cell 增加 center，垂直居中 -->
    <PressCell
      :size="size"
      :title="title"
      :title-class="titleClass"
      :icon="icon"
      :value="value"
      :label="label"
      :is-link="isLink"
      :clickable="clickable"
      :border="border && expanded"
      :custom-class="collapseItemCustomClass"
      hover-class="press-cell--hover"
      center
      @click="onClick"
    >
      <template #title>
        <slot
          name="title"
        />
      </template>

      <slot name="value" />

      <template #right-icon>
        <slot
          name="right-icon"
        />
      </template>
    </PressCell>

    <div
      :class="wrapperClass"
      :style="animationStyle"
    >
      <div :class="['press-collapse-item__content', contentClass]">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_COLLAPSE as PARENT } from '../common/constant/parent-map';
import utils from '../common/utils/utils';

import { ChildrenMixin } from '../mixins/relation';
import PressCell from '../press-cell/press-cell.vue';

import { setContentAnimate } from './animate';


export default {
  name: 'PressCollapseItem',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressCell,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],
  props: {
    size: { type: String, default: '' },
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    value: { type: String, default: '' },
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    border: {
      type: Boolean,
      default: true,
    },
    isLink: {
      type: Boolean,
      default: true,
    },
    titleClass: {
      type: String,
      default: '',
    },
    contentClass: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: [],
  data() {
    const { defaultExpandAll } = this[PARENT];
    return {
      expanded: !!defaultExpandAll,
      animation: {},
      mounted: false,

      animationStyle: defaultExpandAll ? 'height: auto;' : 'height: 0;',
    };
  },
  computed: {
    collapseItemClass() {
      const { disabled, expanded } = this;
      return utils.bem2('collapse-item__title', { disabled, expanded });
    },
    collapseItemCustomClass() {
      let result = '';
      result = this.collapseItemClass;
      return result;
    },
    wrapperClass() {
      return utils.bem2('collapse-item__wrapper');
    },
  },
  mounted() {
    this.updateExpanded();
    this.mounted = true;
  },
  methods: {
    updateExpanded() {
      if (!this[PARENT]) {
        return;
      }
      const { value, accordion } = this[PARENT];
      const { children = [] } = this[PARENT];
      const { name } = this;
      const index = children.indexOf(this);
      const currentName = name == null ? index : name;
      const expanded = accordion
        ? value === currentName
        : (value || []).some(name => name === currentName);
      if (expanded !== this.expanded) {
        setContentAnimate(this, expanded, this.mounted);
      }
      // this.index = index;
      this.expanded = expanded;
    },
    onClick() {
      if (this.disabled) {
        return;
      }
      const { name, expanded } = this;
      const index = this[PARENT].children.indexOf(this);
      const currentName = name == null ? index : name;
      this[PARENT].switch(currentName, !expanded);
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
